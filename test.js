var users = require('./utils/users');
var apply = require('./utils/apply');
var intro = require('./utils/introduction');
var md5 = require('md5')

let createTestData = async () => {
	return new Promise(async (resolve, reject) => {
		await users.addUser({
			name: 'a1',
			email: 'a1',
			phone: 'a1',
			role: 'normal',
			passwd: md5(md5('1'))
		})
		await users.addUser({
			name: 'a2',
			email: 'a2',
			phone: 'a2',
			role: 'normal',
			passwd: md5(md5('1'))
		})
		await users.addUser({
			name: 'a3',
			email: 'a3',
			phone: 'a3',
			role: 'normal',
			passwd: md5(md5('1'))
		})
		await users.addUser({
			name: 'd1',
			email: 'd1',
			phone: 'd1',
			role: 'doctor',
			passwd: md5(md5('1'))
		})
		await users.addUser({
			name: 'd2',
			email: 'd2',
			phone: 'd2',
			role: 'doctor',
			passwd: md5(md5('1'))
		})
		await users.addUser({
			name: 'd3',
			email: 'd3',
			phone: 'd3',
			role: 'doctor',
			passwd: md5(md5('1'))
		})
		let introd1 = {
			did: JSON.parse(JSON.stringify(await users.getUserInfo({ email: 'd1' })))[0].id,
			info: 'i am the best doctor',
			aff: 'eye'
		}
		let introd2 = {
			did: JSON.parse(JSON.stringify(await users.getUserInfo({ email: 'd2' })))[0].id,
			info: 'what the fuck',
			aff: 'head'
		}
		let introd3 = {
			did: JSON.parse(JSON.stringify(await users.getUserInfo({ email: 'd3' })))[0].id,
			info: 'oh yes',
			aff: 'head'
		}
		await intro.addIntroduction(introd1);
		await intro.addIntroduction(introd2);
		await intro.addIntroduction(introd3);

		apply.addApply({
			did: JSON.parse(JSON.stringify(await users.getUserInfo({ email: 'd1' })))[0].id,
			nid: JSON.parse(JSON.stringify(await users.getUserInfo({ email: 'a1' })))[0].id,
			atime: '0',
			archivetime: '0'
		})
		apply.addApply({
			did: JSON.parse(JSON.stringify(await users.getUserInfo({ email: 'd1' })))[0].id,
			nid: JSON.parse(JSON.stringify(await users.getUserInfo({ email: 'a2' })))[0].id,
			atime: '0',
			archivetime: '0'
		})
		apply.addApply({
			did: JSON.parse(JSON.stringify(await users.getUserInfo({ email: 'd2' })))[0].id,
			nid: JSON.parse(JSON.stringify(await users.getUserInfo({ email: 'a3' })))[0].id,
			atime: '0',
			archivetime: '0'
		})
	})
}

(async () => {
	// let userinfo = {
	//     name: 'test1',
	//     email: 'test1',
	//     phone: 'test1',
	//     role: 'test1',
	//     passwd: 'test3'
	// }

	// let app = {
	//     did: '1427cf2d-b263-48a7-8118-bddef0194af3',
	//     nid: '5122384f-122d-4eb0-8f32-edea08aed757',
	//     atime: '0',
	//     archivetime: '0'
	// }
	// // let info = await users.addUser(userinfo)

	// // let info = await users.updateUser({
	// //     email: 'd2',
	// //     role: 'doctor'
	// // })
	// // info = await users.updateUser({
	// //     email: 'd1',
	// //     role: 'doctor'
	// // })

	// // let info = await users.checkPassword('test', 'test')
	// // await intro.addIntroduction(introd1);
	// // await intro.addIntroduction(introd2);

	// let info = await intro.getAffIntroduction('eye')
	// info = await apply.addApply(app)
	// console.log('-----------------------------------------')
	// console.log(info)
	await createTestData()
	// console.log(await intro.getAff())
})()