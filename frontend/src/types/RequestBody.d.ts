interface RequestBody {
  gridSize: {
    x: number
    y: number
  }
  initialPosition: {
    x: number
    y: number
    orientation: CardinalDirections
  }
  commandString: string
}
export default RequestBody
