import {defineNuxtPlugin} from "#app";
import * as pkg from '../package.json'
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";

export default defineNuxtPlugin((nuxtApp) => {
    const release = pkg.version
    const environment = useRuntimeConfig();

    Sentry.init({
        dsn: environment.public.sentry,
        release,
        integrations: [new Integrations.BrowserTracing()],
        sampleRate: 1,
        tracesSampleRate: 1
    })
})
