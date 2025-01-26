
export type Todo = {
    id: number,
    title: string,
    complete: number,
    type: "tick" | "timer" | "increament",
    time: number,
    timeCompleted: number,
    maxIncreament: number,
    increamentCompleted: number,
    emoji: string,
    bgColor: string,
    date: number
}


export type Note = {
    id: number,
    title: string,
    content: string,
    date: number,
    tag?: string,
    color: string
}

export type Journal = {
    id: number,
    content: string,
    date: number
}
