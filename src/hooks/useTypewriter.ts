import { useEffect, useState } from 'react'

/** Cycles through strings with a realistic typewriter effect. */
export function useTypewriter(
  phrases: string[],
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseDuration = 2000,
) {
  const [displayText, setDisplayText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIndex] ?? ''

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          const next = current.slice(0, displayText.length + 1)
          setDisplayText(next)

          if (next === current) {
            setTimeout(() => setIsDeleting(true), pauseDuration)
          }
        } else {
          const next = current.slice(0, displayText.length - 1)
          setDisplayText(next)

          if (next === '') {
            setIsDeleting(false)
            setPhraseIndex((i) => (i + 1) % phrases.length)
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration])

  return displayText
}
