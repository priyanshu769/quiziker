import {Quizzes} from "./types"

export const quizzes: Quizzes = [
    {
        id: "123",
        name: "Bikes & Sports",
        questions: [
            {
                question: "Which bike is the most expensive bike in the world?",
                options: [
                    { answer: "Neiman Marcus Limited Edition Fighter", correct: true },
                    { answer: "Ecosse ES1 Spirit", correct: false },
                    { answer: "1949 E90 AJS Porcupine", correct: false },
                ]
            },
            {
                question: "Which bike is the world's fastest bike?",
                options: [
                    { answer: "MTT Turbine Superbike Y2K", correct: false },
                    { answer: "Suzuki Hayabusa", correct: false },
                    { answer: "Dodge Tomahawk", correct: true },
                ]
            },
            {
                question: "What is the top speed of the world's fastest bike?",
                options: [
                    { answer: "322 mph", correct: false },
                    { answer: "350 mph", correct: true },
                    { answer: "377 mph", correct: false },
                ]
            },
            {
                question: "Which bike is the world's cheapest bike?",
                options: [
                    { answer: "Yamaha Crux", correct: true },
                    { answer: "TVS Max", correct: false },
                    { answer: "Hero HF Dawn", correct: false },
                ]
            },
            {
                question: "Which bike has the world's highest mileage?",
                options: [
                    { answer: "Bajaj Platina", correct: false },
                    { answer: "TVS XL100", correct: true },
                    { answer: "Hero Pook", correct: false },
                ]
            }
        ]
    },
    {
        id: "124",
        name: "Car and Sports",
        questions: [
            {
                question: "Which car is the world's fastest car?",
                options: [
                    { answer: "Hennessey Venom GT", correct: true },
                    { answer: "Koenigsegg Agera R", correct: false },
                    { answer: "9ff GT9-R", correct: false },
                ]
            },
            {
                question: "What is the top speed of the world's fastest car?",
                options: [
                    { answer: "256.69 mph", correct: false },
                    { answer: "289.64 mph", correct: false },
                    { answer: "270.49 mph", correct: true },
                ]
            },
            {
                question: "Which car is the most expensive car in the world?",
                options: [
                    { answer: "Koenigsegg CCXR Trevita", correct: false },
                    { answer: "Bugatti La Voiture Noire", correct: true },
                    { answer: "Bugatti Centodieci", correct: false },
                ]
            },
            {
                question: "Which car has the world's highest mileage?",
                options: [
                    { answer: "1983 Lincoln Town Car", correct: false },
                    { answer: "1966 Volvo P1800", correct: false },
                    { answer: "1991 Chevy C1500", correct: true },
                ]
            },
            {
                question: "Which car is the world's cheapest car?",
                options: [
                    { answer: "Chevy C800", correct: false },
                    { answer: "Tata Nano", correct: true },
                    { answer: "Marcus 678", correct: false },
                ]
            },
        ]
    },
    {
        id: "125",
        name: "Motorcycle Generally",
        questions: [
            {
                question: "When was the motorcycle's layout established?",
                options: [
                    { answer: "1914", correct: true },
                    { answer: "1904", correct: false },
                    { answer: "1941", correct: false },
                ]
            },
            {
                question: "The rotational force of the crankshaft is transmitted to:",
                options: [
                    { answer: "The Throttle", correct: false },
                    { answer: "The Rear Wheel", correct: true },
                    { answer: "The Front Wheel", correct: false },
                ]
            },
            {
                question: "In 1917, who bought roughly one-third of all the Harley-Davidson motorcycles produced?",
                options: [
                    { answer: "The U.S Army", correct: true },
                    { answer: "Heli's Angels", correct: false },
                    { answer: "The Salvation Army", correct: false },
                ]
            },
            {
                question: "Unwanted motion in the rear of the motorcycle is called:",
                options: [
                    { answer: "Gear Shanking", correct: false },
                    { answer: "Throttle Wank", correct: false },
                    { answer: "Shaft Jacking", correct: true },
                ]
            },
            {
                question: "What allows motorcycles to use tubeless tires now?",
                options: [
                    { answer: "Pneumatic Tyres", correct: false },
                    { answer: "Cast Wheels", correct: true },
                    { answer: "Steel Rims", correct: false },
                ]
            }
        ]
    }
]