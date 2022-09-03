import { useCallback, useEffect, useState } from 'react'
import { FluentBundle, FluentResource } from '@fluent/bundle'
import { negotiateLanguages } from "@fluent/langneg";
import axios from 'axios'

const LOCALES_ALL = ['zh-CN', 'en-US']

async function getBundle (locale: string): Promise<FluentBundle> {
  const url = `/locale/${locale}.ftl` // fluent bundle file location
  const response = await axios.get(url)
  const bundle = new FluentBundle(locale)
  bundle.addResource(new FluentResource(response.data))
  return bundle
}

/**
 * useTranslation Hooks
 * @example
 *  const { t } = useTranslation()
 *  t('hello', 'Hello World!')
 * @returns
 */

export default function useTranslation() {
  const [bundle, setBundle] = useState<FluentBundle | null>(null)
  const userLocales = typeof navigator === 'undefined' ? [] : navigator.languages
  const supportedLocales = negotiateLanguages(
    userLocales, // requested locales
    LOCALES_ALL, // available locales
    { defaultLocale: "en-US" }
  );
  const locale = supportedLocales[0] ?? "en-US"

  useEffect(() => {
    getBundle(locale)
      .then(bundle => setBundle(bundle))
      .catch(console.error)
  },[ locale ])

  const translate = useCallback((id: string, fallback?: string) => {
    return bundle?.getMessage(id)?.value as string ?? fallback
  }, [bundle])

  return { t: translate, locale }
}
