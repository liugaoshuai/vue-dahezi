<template>
	<div class="box">

		<!-- <ul>
      <li><mt-button class="btn" @click="$router.push('/AttentionMatters')">注意事项</mt-button></li>
      <li><mt-button class="btn" @click="$router.push('/CleaningCar')">洗车中</mt-button></li>
      <li><mt-button class="btn" @click="$router.push('/FinishStop')">完成洗车</mt-button></li>
      <li><mt-button class="btn" @click="$router.push('/PayCar')">支付洗车</mt-button></li>
      <li><mt-button class="btn" @click="$router.push('/SelectCar')">选择车辆</mt-button></li>
      <li><mt-button class="btn" @click="$router.push('/StopCar')">停车确认</mt-button></li>
      <li><mt-button class="btn" @click="$router.push('/Payment')">订单支付</mt-button></li>
      <li><mt-button class="btn" @click="$router.push('/CardIndex')">办卡首页</mt-button></li>
      <li><mt-button class="btn" @click="$router.push('/CardDetail')">办卡详情</mt-button></li>
    </ul> -->

		<ul>
			<li>
				<mt-button class="btn" @click="$router.push('/Login')">第一步 - 模拟登陆</mt-button>
			</li>
			<li>
				<mt-button class="btn" @click="$router.push('/StopCar')">第二步 - 停车确认</mt-button>
			</li>
			<li>
				<mt-button class="btn" @click="$router.push('/PayCar')">第三步 - 支付洗车</mt-button>
			</li>
			<li>
				<mt-button class="btn" @click="$router.push('/MyPlateNumber')">选择车辆</mt-button>
			</li>
			<li>
				<mt-button class="btn" @click="$router.push('/AttentionMatters')">第四步 - 注意事项</mt-button>
			</li>
			<li>
				<mt-button class="btn" @click="$router.push('/CleaningCar')">第五步 - 洗车中</mt-button>
			</li>

			<li>
				<mt-button class="btn" @click="$router.push('/FinishStop')">第六步 - 洗车完成</mt-button>
			</li>
			<li>
				<mt-button class="btn" @click="$router.push('/OrderPay')">订单支付</mt-button>
			</li>
			<li>
				<mt-button class="btn" @click="$router.push('/CardIndex')">会员卡 - 列表</mt-button>
			</li>
			<li>
				<mt-button class="btn" @click="$router.push('/CardDetail')">会员卡 - 详情</mt-button>
			</li>
			<li>
				<mt-button class="btn" @click="$router.push('/MyIndex')">个人中心 - 主页</mt-button>
			</li>
			<li>
				<mt-button class="btn" @click="$router.push('/MyOrder')">个人中心 - 我的订单</mt-button>
			</li>
			<li>
				<mt-button class="btn" @click="$router.push('/MyCard')">个人中心 - 我的卡卷</mt-button>
			</li>
			<li>
				<mt-button class="btn" @click="$router.push('/MyMessage')">个人中心 - 个人资料</mt-button>
			</li>
		</ul>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeNames: ["1"]
			};
		},
		mounted: function () {
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