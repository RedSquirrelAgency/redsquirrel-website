import { onMounted } from 'vue'
import type { Mesh } from 'three'
import { Box3, Vector3 } from 'three'

export const useAdaptiveMesh = (mesh: Mesh, scale: number) => {
  const boundingBox = new Box3().setFromObject(mesh)
  const measure = new Vector3()
  const size = boundingBox.getSize(measure)

  function updateScale() {
    const aspectRatioWidth = size.x
    const aspectRatioHeight = size.y

    // Calculate the target area of the object in the viewport
    const targetArea = scale * width.value * height.value

    // Calculate the aspect ratio
    const aspectRatio = aspectRatioWidth / aspectRatioHeight

    // Calculate target width and height based on the aspect ratio and target area
    const targetHeight = Math.sqrt(targetArea / aspectRatio)
    const targetWidth = targetHeight * aspectRatio

    // Calculate the scaling factors
    const widthScale = targetWidth / aspectRatioWidth
    const heightScale = targetHeight / aspectRatioHeight

    // Determine the uniform scaling factor (the smaller of the two)
    const scaleFactor = Math.min(widthScale, heightScale)
    mesh.scale.set(scaleFactor, scaleFactor, scaleFactor)
  }

  const { width, height } = useWindowSize()
  watch([width, height], updateScale)
  onMounted(updateScale)

  return { width, height }
}
