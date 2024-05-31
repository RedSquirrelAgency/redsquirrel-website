export const navigationEmits = ['next', 'back']

export function useSectionNavigation(emit: any) {

  function next() {
    emit('next')
  }

  function back() {
    emit('back')
  }

  return { next, back }
}
