const chakram = require('chakram');
const expect = chakram.expect;

describe('Get Reviews', () => {
    it('should successfully get reviews', () => {
        const response = chakram.get("http://localhost:3000/reviews?product_id=5&page=0&count=10&sort='newest'");
        expect(response).to.have.status(200);
        return chakram.wait();
    })

    it('should successfully get review meta data', () => {
        const response = chakram.get("http://localhost:3000/reviews/meta?product_id=13338");
        expect(response).to.have.status(200);
        return chakram.wait();
    })
})

// describe('Post Review', () => {
//     it('should successfully post a reivew', () => {
//         const response = chakram.post('http://localhost:3000/reviews')
//     })
// })

// describe('Update Helpfulness', () => {
//     it('should increase helpfulness by one', () => {
//         const response = chakram.put('localhost:3000/reviews/35/helpful')
//         expect(response).to.have.status(200);
//         return chakram.wait();
//     })
// })