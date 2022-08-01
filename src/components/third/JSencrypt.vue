<template>
	<div class="app-container">
		<h2 style="text-align: center">在线生成公私钥对 —  http://web.chacuo.net/netrsakeypair</h2>
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="公钥">
				<el-input v-model="form.publicKey" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
			</el-form-item>
			<el-form-item label="私钥">
				<el-input v-model="form.privateKey" type="textarea" :autosize="{ minRows: 6, maxRows: 8}"></el-input>
			</el-form-item>
			<el-form-item label="原文">
				<el-input v-model="form.txt" type="input"></el-input>
			</el-form-item>
			<el-divider><i class="el-icon-mobile-phone"><el-button type="danger" size="mini" plain @click="encrypt">加密</el-button></i></el-divider>
			<el-form-item label="密文">
				<span>{{ form.encryptTxt }}</span>
			</el-form-item>
			<el-divider><i class="el-icon-bell"><el-button type="success" size="mini" plain @click="decrypt">解密</el-button></i></el-divider>
			<el-form-item label="解密">
				<span>{{ form.decryptTxt }}</span>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

export default {
	name: "JSEncryptPage",
	data() { 
		return {
			form: {
				publicKey: '',
				privateKey: '',
				txt: '', 
				encryptTxt: null,
				decryptTxt: null
			}
		}
	},
	methods: {
		encrypt() {
			const encryptor = new JSEncrypt()
			encryptor.setPublicKey(this.form.publicKey) // 设置公钥
			this.form.encryptTxt = encryptor.encrypt(this.form.txt) // 对数据进行加密
		},
		decrypt() {
			const encryptor = new JSEncrypt()
			encryptor.setPrivateKey(this.form.privateKey) // 设置私钥
			console.log(this.form.encryptTxt)
			this.form.decryptTxt = encryptor.decrypt(this.form.encryptTxt) // 对数据进行解密
		},
		cancel() {
			this.form = {};
		}
	}
}
</script>