import {describe, test, expect} from "@jest/globals";
import {result} from "../../pages";
import {prevSlide, nextSlide, init_hiddens} from "../../pages/products/[id]";
import {default_address, SetAddress} from "../helpers/setAddres";

describe('testing result', () =>{
    test('normal', ()=>{
        expect(result(29)).toBe("object-top")
        expect(result(2)).toBe("object-left")
        expect(result(234)).toBe("object-left")
    })
    test('prevSlide', () => {
        let slide = ["hidden", "hidden", "block", "hidden"]
        slide = prevSlide(slide)
        expect(slide).toEqual(["hidden", "block", "hidden", "hidden"])
        slide = prevSlide(slide)
        slide = prevSlide(slide)
        expect(slide).toEqual(["hidden", "hidden", "hidden", "block"])
    })
    test('nextSlide', () => {
        let slide = ["hidden", "hidden", "block", "hidden"]
        slide = nextSlide(slide)
        expect(slide).toEqual(["hidden", "hidden", "hidden", "block"])
        slide = nextSlide(slide)
        slide = nextSlide(slide)
        expect(slide).toEqual(["hidden", "block", "hidden", "hidden"])
    })
    test('initialize array', () =>{
        expect(init_hiddens(0)).toEqual(["block"])
        expect(init_hiddens(1)).toEqual(["block"])
        expect(init_hiddens(2)).toEqual(["block", "hidden"])
        expect(init_hiddens(23)).toEqual(["block", "hidden", "hidden", "hidden", "hidden",
            "hidden", "hidden", "hidden", "hidden", "hidden", "hidden", "hidden", "hidden", "hidden",
            "hidden", "hidden", "hidden", "hidden", "hidden", "hidden", "hidden", "hidden", "hidden"])
    })
    test('setAddress', () => {
        expect(default_address).toEqual("https://dummyjson.com/products")
        SetAddress("another url")
        expect(default_address).toEqual("another url")
        SetAddress("")
        expect(default_address).toEqual("another url")
    })

})


