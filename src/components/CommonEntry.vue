<template>
	<div class="box">
		<mt-button class="btn" @click="$router.push('/Login')">模拟登陆</mt-button>
		<mt-button class="btn" @click="$router.push('/StopCar')">停车确认</mt-button>
		<mt-button class="btn" @click="$router.push('/PayCar')">支付洗车</mt-button>
		<mt-button class="btn" @click="$router.push('/MyPlateNumber')">选择车辆</mt-button>
		<mt-button class="btn" @click="$router.push('/AttentionMatters')">注意事项</mt-button>
		<mt-button class="btn" @click="$router.push('/CleaningCar')">洗车</mt-button>
		<mt-button class="btn" @click="$router.push('/OrderPay')">订单支付</mt-button>
		<mt-button class="btn" @click="$router.push('/CardIndex')">会员卡列表</mt-button>
		<mt-button class="btn" @click="$router.push('/CardDetail')">会员卡详情</mt-button>
		<mt-button class="btn" @click="$router.push('/MyIndex')">我的主页</mt-button>
		<mt-button class="btn" @click="$router.push('/MyOrder')">我的订单</mt-button>
		<mt-button class="btn" @click="$router.push('/MyCard')">我的卡卷</mt-button>
		<mt-button class="btn" @click="$router.push('/MyMessage')">个人资料</mt-button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			activeNames: ["1"]
		};
	},
	mounted: function() {
	},

	methods: {

	}
}
</script>

<style scoped>
.box {
	padding: 1rem;
}

.btn {
	margin: 0.5rem;
}
</style>