export default function* () {

    for (const key of Object.keys(this)) {

        yield this[key];

    }   

}