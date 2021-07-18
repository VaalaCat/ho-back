var users = require('./utils/users');
var apply = require('./utils/apply');
var intro = require('./utils/introduction');
var md5 = require('md5')

let createTestData = async () => {
	return new Promise(async (resolve, reject) => {
		await users.addUser({
			name: 'admin',
			email: 'admin@admin.admin',
			phone: 'admin',
			role: 'admin',
			passwd: md5(md5('admin'))
		})
		await users.addUser({
			name: '张三',
			email: '1@1.1',
			phone: 'a1',
			role: 'normal',
			passwd: md5(md5('1'))
		})
		await users.addUser({
			name: '李四',
			email: '2@2.2',
			phone: 'a2',
			role: 'normal',
			passwd: md5(md5('1'))
		})
		await users.addUser({
			name: '王五',
			email: '3@3.3',
			phone: 'a3',
			role: 'normal',
			passwd: md5(md5('1'))
		})
		await users.addUser({
			name: '六医生',
			email: '6@6.6',
			phone: 'd1',
			role: 'doctor',
			passwd: md5(md5('1'))
		})
		await users.addUser({
			name: '二三三医生',
			email: '23@23.23',
			phone: 'd2',
			role: 'doctor',
			passwd: md5(md5('1'))
		})
		await users.addUser({
			name: '四医生',
			email: '4@4.4',
			phone: 'd3',
			role: 'doctor',
			passwd: md5(md5('1'))
		})
		let introd1 = {
			did: JSON.parse(JSON.stringify(await users.getUserInfo({ email: '6@6.6' })))[0].id,
			info: '我是最好的医生',
			aff: '眼科'
		}
		let introd2 = {
			did: JSON.parse(JSON.stringify(await users.getUserInfo({ email: '23@23.23' })))[0].id,
			info: '不不不，我才是最好的',
			aff: '脑科'
		}
		let introd3 = {
			did: JSON.parse(JSON.stringify(await users.getUserInfo({ email: '4@4.4' })))[0].id,
			info: '你们都没我好',
			aff: '脑科'
		}
		await intro.addIntroduction(introd1);
		await intro.addIntroduction(introd2);
		await intro.addIntroduction(introd3);

		apply.addApply({
			did: JSON.parse(JSON.stringify(await users.getUserInfo({ email: '6@6.6' })))[0].id,
			nid: JSON.parse(JSON.stringify(await users.getUserInfo({ email: '1@1.1' })))[0].id,
			atime: '2021-06-06',
			archivetime: '0'
		})
		apply.addApply({
			did: JSON.parse(JSON.stringify(await users.getUserInfo({ email: '6@6.6' })))[0].id,
			nid: JSON.parse(JSON.stringify(await users.getUserInfo({ email: '2@2.2' })))[0].id,
			atime: '2021-01-01',
			archivetime: '0'
		})
		apply.addApply({
			did: JSON.parse(JSON.stringify(await users.getUserInfo({ email: '23@23.23' })))[0].id,
			nid: JSON.parse(JSON.stringify(await users.getUserInfo({ email: '3@3.3' })))[0].id,
			atime: '2022-10-10',
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
	// console.log(JSON.stringify(await users.searchUser()))
	// console.log(await intro.getAff())
})()