import { ref } from 'vue'

type AppBarVariant = 'fixed' | 'floating'

export const useAppBar = () => {
  const variant = ref('fixed')

  const setVariant = (_variant: AppBarVariant) => {
    variant.value = _variant
  }

  return { variant, setVariant }
}
