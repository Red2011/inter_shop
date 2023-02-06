import {describe, test, expect} from "@jest/globals";
import {result} from "../../pages";
import {
    prevSlide,
    nextSlide,
    init_hiddens,
    init_bool_count,
    add_true_next,
    add_true_prev
} from "../../pages/products/[id]";
import {default_address, SetAddress} from "../helpers/setAddres";

describe('testing result', () =>{
    test('normal', ()=>{
        expect(result(29)).toBe("object-top")
        expect(result(2)).toBe("object-left")
        expect(result(234)).toBe("object-left")
    })
    test('prevSlide', () => {
        let slide = ["hidden", "hidden", "block", "hidden"]
        slide = prevSlide(slide, 4)
        expect(slide).toEqual(["hidden", "block", "hidden", "hidden"])
        slide = prevSlide(slide, 4)
        slide = prevSlide(slide, 4)
        expect(slide).toEqual(["hidden", "hidden", "hidden", "block"])
        /*after update*/
        expect(prevSlide(["block"], 4)).toEqual(["hidden","","", "block"])
        expect(prevSlide(["hidden","","", "block"], 4)).toEqual(["hidden","","block", "hidden"])
        expect(prevSlide(["hidden","","block", "hidden"], 4)).toEqual(["hidden","block","hidden", "hidden"])
        expect(prevSlide(["block","hidden","hidden", "hidden"], 4)).toEqual(["hidden","hidden","hidden", "block"])
        expect(prevSlide(["block"], 10)).toEqual(["hidden", "", "", "", "", "", "", "", "", "block"])
    })
    test('nextSlide', () => {
        let slide = ["hidden", "hidden", "block", "hidden"]
        slide = nextSlide(slide, 4)
        expect(slide).toEqual(["hidden", "hidden", "hidden", "block"])
        slide = nextSlide(slide, 4)
        slide = nextSlide(slide, 4)
        expect(slide).toEqual(["hidden", "block", "hidden", "hidden"])
        /*after update*/
        expect(nextSlide(["block"], 4)).toEqual(["hidden","block", "hidden"])
        expect(nextSlide(["hidden","block", "hidden"], 4)).toEqual(["hidden","hidden", "block", "hidden"])
        expect(nextSlide(["hidden","hidden", "block", "hidden"], 4)).toEqual(["hidden","hidden", "hidden", "block"])
        expect(nextSlide(["hidden","hidden", "hidden", "block"], 4)).toEqual(["block","hidden", "hidden", "hidden"])
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
        expect(default_address).toEqual("https://dummyjson.com/products?limit=100")
        SetAddress("another url")
        expect(default_address).toEqual("another url")
        SetAddress("")
        expect(default_address).toEqual("another url")
    })
    test('init_bool_count',()=>{
        expect(init_bool_count(2)).toEqual([true, false])
        expect(init_bool_count(3)).toEqual([true, false, false])
        expect(init_bool_count(4)).toEqual([true, false, false, false])
        expect(init_bool_count(0)).toEqual([])
    })
    test('add_true_next', () => {
        expect(add_true_next([true, false, false])).toEqual([true, true, false])
        expect(add_true_next([true, true, true])).toEqual([true, true, true])
        expect(add_true_next([true])).toEqual([true])
        expect(add_true_next([false])).toEqual([true])
        expect(add_true_next([])).toEqual([])
    })
    test('add_true_prev', ()=> {
        expect(add_true_prev([true, false, false])).toEqual([true, false, true])
        expect(add_true_prev([true, true, true])).toEqual([true, true, true])
        expect(add_true_prev([true])).toEqual([true])
        expect(add_true_prev([false])).toEqual([true])
        expect(add_true_prev([])).toEqual([])
    })

})


