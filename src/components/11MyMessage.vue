<template>
    <div>
        <div class="my-header bgbai">
            <div class="my-header-bg"></div>
            <h3 class="common-title tac">您已洗车{{cleanCarNum}}次</h3>
        </div>
        <div class="">
            <mt-cell title="姓名" value=""></mt-cell>
            <mt-cell title="手机号" value=""></mt-cell>
            <mt-cell title="车辆信息" to="/MyPlateNumber" is-link></mt-cell>
            <mt-cell title="关于我们" to="/agreement/about" is-link></mt-cell>
            <mt-cell title="用户协议" to="/agreement/user" is-link></mt-cell>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            cleanCarNum: 0,
        };
    },
    mounted: function() {
    },
    components: {
    },
    methods: {
    }
}
</script>
