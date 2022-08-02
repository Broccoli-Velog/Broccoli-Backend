/**
 * class 에 [Symbol.iterator] 항목을 만들고 이 함수를 넣으면, `for of` 에서 사용할 수 있는 `@iterable` 객체가 됩니다.
 */
export default function* () {

    for (const key of Object.keys(this)) {

        yield this[key];

    }   

}