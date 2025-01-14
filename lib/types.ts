


export type Todo ={
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