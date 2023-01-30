import {describe, test, expect} from "@jest/globals";
import {result} from "../../pages";
import {prevSlide, nextSlide} from "../../pages/products/[id]";

describe('testing result', () =>{
    test('normal', ()=>{
        expect(result(29)).toBe("object-top")
        expect(result(2)).toBe("object-left")
        expect(result(234)).toBe("object-left")
    })
    test('prevSlide', () => {
        const slide = ["a", "b", "c", "d"]
        expect(prevSlide(2, slide)).toBe(1)
        expect(prevSlide(3, slide)).toBe(2)
        expect(prevSlide(0, slide)).toBe(3)
        expect(prevSlide(113, slide)).toBe(0)
    })
    test('nextSlide', () => {
        const slide = ["a", "b", "c", "d"]
        expect(nextSlide(2, slide)).toBe(3)
        expect(nextSlide(3, slide)).toBe(0)
        expect(nextSlide(0, slide)).toBe(1)
        expect(nextSlide(113, slide)).toBe(0)
    })
})


