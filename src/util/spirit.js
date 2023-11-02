// 表单重置
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields();
  }
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

