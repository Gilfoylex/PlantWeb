<template>
    <var-swipe class="swipe-example">
        <var-swipe-item v-for="item in images">
            <img class="swipe-example-image" :src="item">
        </var-swipe-item>
    </var-swipe>
    <var-row>
        <var-col :span="8" offset="8">
            <var-button class="preview-btn" @click="show = true">
                查看大图
            </var-button>
        </var-col>
    </var-row>
    <var-image-preview closeable :images="bigImages" v-model:show="show" />
    <var-row v-for="item in plantInfo" :key="item.name">
        <var-col span='8'>
            <div class="item-name">{{ item.name }}</div>
        </var-col>
        <var-col span='16'>
            <div class="item-value">{{ item.value }}</div>
        </var-col>
    </var-row>
</template>
  
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from 'vue-router'
const route = useRoute();
const plantInfoData = ref(null);

onMounted(() => {
    fetch(`/api/plant/${route.params.id}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to fetch plant info");
            }
        })
        .then((data) => {
            plantInfoData.value = data;
        })
        .catch((error) => {
            console.error(error);
            plantInfoData.value = {};
        });
})

const show = ref(false)
const images = ref([
    `/api/image/${route.params.id}-1.png?height=400`,
    `/api/image/${route.params.id}-2.png?height=400`,
    `/api/image/${route.params.id}-3.png?height=400`,
    `/api/image/${route.params.id}-4.png?height=400`,
])

const bigImages = ref([
    `/api/image/${route.params.id}-1.png?height=800`,
    `/api/image/${route.params.id}-2.png?height=800`,
    `/api/image/${route.params.id}-3.png?height=800`,
    `/api/image/${route.params.id}-4.png?height=800`,
])

const plantInfo = computed(() => {
    if (!plantInfoData.value) {
        return [];
    }

    const plant = plantInfoData.value;
    return [
        { name: "乔木编号", value: plant.id },
        { name: "中文名称", value: plant.cnName },
        { name: "拉丁学名", value: plant.latinName },
        { name: "俗名土名", value: plant.commonName },
        { name: "经度", value: plant.longitude },
        { name: "纬度", value: plant.latitude },
        { name: "城区", value: plant.district },
        { name: "街道乡镇", value: plant.streetTown },
        { name: "社区", value: plant.community },
        { name: "道路名", value: plant.roadName },
        { name: "路段起始位置", value: plant.roadStart },
        { name: "路段截至位置", value: plant.roadEnd },
        { name: "绿地类型", value: plant.greenSpaceType },
        { name: "位于道路方向", value: plant.locatedInRoadDirection },
        { name: "树龄", value: plant.age },
        { name: "树龄确定方法", value: plant.ageDeterminationMethod },
        { name: "胸径", value: plant.chestDiameters },
        { name: "树高 (单位: 米)", value: plant.height },
        { name: "冠幅 (东西) (单位: 米)", value: plant.crownSpreadEW },
        { name: "冠幅 (南北) (单位: 米)", value: plant.crownSpreadSN },
        { name: "树穴（树池）形状", value: plant.poolShape },
        { name: "圆形树穴", value: plant.circleCave },
        { name: "方形树穴长 (单位: 厘米)", value: plant.squareLength },
        { name: "方形树穴宽 (单位: 厘米)", value: plant.squareWidth },
        { name: "病虫危害", value: plant.pestAndPathogenDamage },
        { name: "土壤", value: plant.soil },
        { name: "地面状况", value: plant.groundCondition },
        { name: "生长势", value: plant.growth },
        { name: "根茎叶状况", value: plant.rootStemLeafCondition },
        { name: "倾斜度", value: plant.tilt },
        { name: "胸径以下分株数", value: plant.dividedPlants },
        { name: "历史养护情况", value: plant.conservationStatus },
        { name: "影响树木生长的外部因素", value: plant.externalFactorsAffectingGrowth },
        { name: "对外部环境的安全隐患", value: plant.externalSecurityRisks },
        { name: "现状保护措施", value: plant.protectionMeasures },
        { name: "备注", value: plant.remarks },
    ];

})
</script>

<style scoped>
.swipe-example {
    height: 400px;
}

.swipe-example-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
}

.preview-btn {
    margin: 10px;
}

.var-col {
    justify-content: start;
    align-items: center;
}

.item-name {
    font-weight: bold;
    padding: 10px;
}

.item-value {
    padding: 10px;
    width: 100%;
}
</style>