<template>
	<div class="app-container">
		<h2 style="text-align: center">在线生成公私钥对（设置公/私钥的时候，不能设置密码） —  http://web.chacuo.net/netrsakeypair</h2>
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
			<el-divider><i class="el-icon-mobile-phone"><el-button type="danger" size="mini" plain @click="encrypt2"> 加密</el-button></i></el-divider>
			<el-form-item label="密文">
				<textarea style="width:99%; height: 70px;">{{ form.encryptTxt }}</textarea>
			</el-form-item>
			<el-divider><i class="el-icon-bell"><el-button type="success" size="mini" plain @click="decrypt2"> 解密</el-button></i></el-divider>
			<el-form-item label="解密">
				<span>{{ form.decryptTxt }}</span>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
// import forge from 'node-forge'
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


		// 加密 node-forge
		encrypt2() {
			const publicKey = forge.pki.publicKeyFromPem(`-----BEGIN PUBLIC KEY-----${this.form.publicKey}-----END PUBLIC KEY-----`)
			const encodeTxt = forge.util.encodeUtf8(this.form.txt)
			const encrypted = publicKey.encrypt(encodeTxt, 'RSA-OAEP', {
				md: forge.md.sha256.create(),
				mgf: forge.mgf.mgf1.create(forge.md.sha1.create()),
			})
			this.form.encryptTxt = forge.util.encode64(encrypted)
		},
		// 解密 node-forge
		decrypt2() {
			const privateKey = forge.pki.privateKeyFromPem(`-----BEGIN PRIVATE KEY-----${this.form.privateKey}-----END PRIVATE KEY-----`);
			const encodeTxt = forge.util.decode64(forge.util.decodeUtf8(this.form.encryptTxt));
			const decrypted = privateKey.decrypt(encodeTxt, 'RSA-OAEP', {
				md: forge.md.sha256.create(),
				mgf: forge.mgf.mgf1.create(forge.md.sha1.create()),
			})
			this.form.decryptTxt = decrypted
		},
		cancel() {
			this.form = {};
		}
	}
}
</script>