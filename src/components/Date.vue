<template>
    <div class="dateClass">
        <div class="block">
            <span class="demonstration">默认</span>
            <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions1">
            </el-date-picker>
        </div>
        <div class="block">
            <span class="demonstration">默认</span>
            <el-date-picker
                v-model="daterange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value1: '',
            daterange: [new Date(), new Date(new Date() + 3600 * 1000 * 24 * 7)],
            pickerOptions1: {
                disabledDate(curTime) {
                    return curTime.getTime() > Date.now();
                },
                shortcuts: [
                    {
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }
                ]
            }
        }
    }
}
</script>

<style scoped>
    .block {
        margin: 10px;
    }
</style>
