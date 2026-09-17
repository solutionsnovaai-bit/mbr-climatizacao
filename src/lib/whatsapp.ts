import { SITE } from '../config/site'

export function waLink(message: string = SITE.defaultMessage) {
  return `https://wa.me/${SITE.phoneDigits}?text=${encodeURIComponent(message)}`
}
