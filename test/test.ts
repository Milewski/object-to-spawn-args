import { toSpawnArgs } from "../source/options-to-spawn-args";
import * as expect from "expect.js";

describe('tests', () => {

    it('should prefix using the standard format: long', () => {

        const object = {
            one: 1,
            two: 2
        }

        expect(toSpawnArgs(object)).to.eql(['--one', 1, '--two', 2])

    })

    it('should prefix using the standard format: short ', () => {

        const object = {
            l: true,
            c: 'red'
        }

        expect(toSpawnArgs(object)).to.eql(['-l', '-c', 'red'])

    })

    it('should wrap the args within quotes', () => {

        const object = {
            one: 1,
            two: true,
            three: 'string'
        }

        expect(toSpawnArgs(object, { quote: true })).to.eql(['--one', '"1"', '--two', '--three', '"string"'])

    })

    it('should work with arrays', () => {

        const object = {
            one: 1,
            two: ['eins', 'zwei'],
            three: true
        }

        expect(toSpawnArgs(object)).to.eql(['--one', 1, '--two', 'eins', 'zwei', '--three'])

    })

    it('should set values with =', () => {

        const object = {
            one: 1,
            two: "two",
            three: true,
            four: [1, 2]
        }

        expect(toSpawnArgs(object, { equal: true })).to.eql(['--one=1', '--two=two', '--three', '--four=1,2'])

    })

    it('should work with option: equal and quote', () => {

        const object = {
            one: 1,
            two: "two",
            three: true,
            four: [1, 2]
        }

        expect(toSpawnArgs(object, {
            equal: true,
            quote: true
        })).to.eql(['--one="1"', '--two="two"', '--three', '--four="1,2"'])

    })

    it('should work with option: equal and quote and prefix', () => {

        const object = {
            one: 1,
            two: "two",
            three: true,
            four: [1, 2, 'string']
        }

        expect(toSpawnArgs(object, {
            equal: true,
            quote: true,
            prefix: '%%'
        })).to.eql(['%%one="1"', '%%two="two"', '%%three', '%%four="1,2,string"'])

    })

    it('should accept prefix', () => {

        const object = {
            one: 1,
            two: "two",
            three: true,
            four: [1, 2]
        }

        expect(toSpawnArgs(object, {
            prefix: '-**$-',
            equal: true
        })).to.eql(['-**$-one=1', '-**$-two=two', '-**$-three', '-**$-four=1,2'])

    })

    it('should accept a function as prefix', () => {

        const object = {
            hash: 1,
            b: 'bang',
            test: [1, 2, "3"]
        }

        function prefix(item) {
            return item.length > 1 ? '#' : '!!'
        }

        expect(toSpawnArgs(object, { prefix: prefix })).to.eql(['#hash', 1, '!!b', 'bang', '#test', 1, 2, '3'])

    })

    it('should auto quote if param has white space', () => {

        const { one, two } = {
            one: 'i should be quoted',
            two: '"i" should \'be\' "quoted"'
        }

        expect(toSpawnArgs({ one })).to.eql(['--one', '"i should be quoted"'])
        expect(toSpawnArgs({ two }, { quote: true })).to.eql(['--two', '"\\"i\\" should \\"be\\" \\"quoted\\""'])

    })

})
