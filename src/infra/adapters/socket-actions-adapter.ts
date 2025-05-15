export type Action = {
  type: 'inQueue' | 'cancel' | 'finished' | 'start'
  attendanceId: string
}

export class SocketActionsAdapter {
  private actions: Action[] = []

  public hasAction(action: Action): boolean {
    console.log('hasAction', action)
    return this.actions.find(action => action.attendanceId === action.attendanceId && action.type === action.type) !== undefined
  }

  public addAction(action: Action): void {
    console.log('addAction', action)
    if (!this.hasAction(action)) {
      this.actions.push(action)
    }
  }

  public removeAction(action: Action): void {
    console.log('removeAction', action)
    this.actions = this.actions.filter((item) => item.attendanceId !== action.attendanceId && item.type !== action.type)
  }
}
