export default defineNuxtPlugin(() => {
  const baseurl = "/api"
  const controller = new AbortController()
  const signal = controller.signal

  return {
    provide: {
      doGet: async (uri,params) => {
        let statusCode = 0
        let data

        let url = `${baseurl}${uri}`
        if(params && Object.keys(params).length > 0){
          let queryParam = Object.keys(params).map((e) => e +"=" +params[e]).join("&")
          url = url + "?" + queryParam
        }
        await $fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          signal: signal,
          onRequestError({ request, options, error }) {
            showError(createError({ statusCode: 500 }))
          },
          onResponse({ request, response, options }) {
            // Process the response data
            statusCode = response.status
            data = response._data
          },
        })
        return {status: statusCode, data: data}
      },
      doPost: async (uri, params) => {
        let statusCode = 0
        let data
        await $fetch(`${baseurl}${uri}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: params,
          signal: signal,
          // credentials: "include",
          onRequestError({ request, options, error }) {
            showError(createError({ statusCode: 500 }))
          },
          onResponse({ request, response, options }) {
            statusCode = response.status
            data = response._data
          },
        })
        return {status: statusCode, data: data}
      },
      doPut: async (uri, params) => {
        let statusCode = 0
        let data
        await $fetch(`${baseurl}${uri}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: params,
          signal: signal,
          onRequestError({ request, options, error }) {
            showError(createError({ statusCode: 500 }))
          },
          onResponse({ request, response, options }) {
            statusCode = response.status
            data = response._data
          },
        })
        return {status: statusCode, data: data}
      },
      doDelete: async (uri, params) => {
        let statusCode = 0
        let data
        await $fetch(`${baseurl}${uri}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: params,
          signal: signal,
          onRequestError({ request, options, error }) {
            showError(createError({ statusCode: 500 }))
          },
          onResponse({ request, response, options }) {
            statusCode = response.status
            data = response._data
          },
        })
        return {status: statusCode, data: data}
      },
      abortFetch: () => {
        controller.abort()
      },
      
    },
  }
})
