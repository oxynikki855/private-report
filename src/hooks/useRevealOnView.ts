import { useEffect, useRef, useState } from 'react'

type RevealOptions = {
  selector?: string
}

export function useRevealOnView<T extends HTMLElement>({ selector }: RevealOptions = {}) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    document.documentElement.classList.add('js-reveal-ready')

    const reveal = (element: Element) => {
      if (!(element instanceof HTMLElement)) return
      element.classList.add('is-revealed')
      setIsVisible(true)
    }

    if (!('IntersectionObserver' in window)) {
      if (selector) root.querySelectorAll(selector).forEach(reveal)
      else reveal(root)
      return
    }

    const observed = new WeakSet<Element>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        reveal(entry.target)
        observer.unobserve(entry.target)
      }
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' })

    const observe = (element: Element) => {
      if (observed.has(element) || !(element instanceof HTMLElement)) return
      observed.add(element)
      observer.observe(element)
    }

    if (!selector) {
      observe(root)
      return () => observer.disconnect()
    }

    const observeMatches = (node: Node) => {
      if (!(node instanceof Element)) return
      if (node.matches(selector)) observe(node)
      node.querySelectorAll(selector).forEach(observe)
    }

    observeMatches(root)
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach(observeMatches)
      }
    })
    mutations.observe(root, { childList: true, subtree: true })

    return () => {
      mutations.disconnect()
      observer.disconnect()
    }
  }, [selector])

  return { ref, isVisible }
}
