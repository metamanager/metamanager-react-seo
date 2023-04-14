import { getRequest, objToJson } from "./utils"

export class CacheService {
    authToken
    cacheName = 'meta-manager-cache'
    constructor(canUseDOM, authToken) {
        this.client = canUseDOM ? caches : null
        this.authToken = authToken
    }

    getTTl() {
        return (new Date()).getTime() + (1000 * 60 * 60 * 24 * 7)
    }

    shouldRefresh(ttl) {
        if (typeof ttl != 'number') {
            return true
        }
        return (new Date()).getTime() > ttl
    }
    /** get the data from cache if exists otherwise fetch new data from the api and set to cache */
    async get(
        key,
        refresh = false
    ) {
        if (refresh || !this.client) {
            return this.fetch(key)
        }
        try {
            const cache = await this.client.open(this.cacheName)
            if (cache) {
                const response = await cache.match(key).catch(err => console.error(err))
                if (response) {
                    const body = await response.json()
                    if (this.shouldRefresh(body.ttl)) {
                        return this.fetch(key)
                    }
                    return body
                } else {
                    return this.fetch(key)
                }
            }
        } catch (err) {
            // console.error(err)
        }
    }

    /** set cache */
    async set(key, res) {
        const cache = await this.client.open(this.cacheName)
        return await cache.put(key, new Response(objToJson({ ...res, ttl: this.getTTl() }), { headers: { "Cache-Control": "max-age=10" } })).then(_ => this.get(key))
    }

    /** fetch data from metamanager api and cache it. */
    async fetch(key) {
        // return false
        const [webSiteId, path] = (key??' __mm__ ').split('__mm__')
        return getRequest(
            {
                url: `https://api.metamanager.io/website/v1/websites/${webSiteId}/pixel?url=${path}`,
                requestBody: {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer '+this.authToken
                    },
                }
            },
        ).then(res => res.json()).then(res => {
            const data = res?.item
            if (data) {
                if (this.client) {
                    return this.set(key, data)
                }
                return data
            }
        }).catch(err => null).finally(_ => false)

    }
}
