<template>
    <NForm class="w-full max-w-lg space-y-8" ref="props.formRef" :rules="rules" :model="modelRef" label-placement="left"
        label-width="auto" require-mark-placement="right-hanging">
        <div>
            <NFormItem path="title" label="标题">
                <NInput v-model:value="modelRef.title" @keydown.enter.prevent placeholder="请输入标题" />
            </NFormItem>
            <NFormItem path="contactName" label="联系人">
                <NInput v-model:value="modelRef.contactName" @keydown.enter.prevent placeholder="请输入联系人姓名" />
            </NFormItem>
            <NFormItem path="contactPhone" label="联系电话">
                <NInput v-model:value="modelRef.contactPhone" @keydown.enter.prevent placeholder="请输入联系电话" />
            </NFormItem>
            <NFormItem path="fileList" label="上传图片">
                <NUpload action="/" :max="3" @change="handleUploadChange" @preview="handlePreview"
                    :default-file-list="modelRef.fileList" list-type="image-card">
                    点击上传
                </NUpload>
                <NModal v-model:show="showModalRef" preset="card" style="width: 600px" title="一张很酷的图片">
                    <img :src="previewImageUrlRef" style="width: 100%">
                </NModal>
            </NFormItem>
            <NFormItem path="content" label="描述">
                <NInput v-model:value="modelRef.content" type="textarea" placeholder="请输入描述信息" />
            </NFormItem>
        </div>
    </NForm>
</template>

<script setup lang="ts">
import { FormInst, FormItemRule, NForm, NFormItem, NImage, NInput, NModal, NRadioButton, NRadioGroup, NStep, NSteps, NUpload, StepsProps, UploadFileInfo, useMessage } from 'naive-ui';
import { ref, watch } from 'vue'
import { ModelType } from '../type'

const props = defineProps<{
    modelRef: ModelType,
    formRef: any,
    handleModelChange:(model: ModelType) => void
}>()


const modelRef = ref(props.modelRef)

const previewImageUrlRef = ref('')
const showModalRef = ref(false)
const formRef = ref<FormInst | null>(props.formRef)

const rules = {
    title: {
        required: true,
        trigger: 'blur',
        message: '请输入标题',
    },
    contactName: {
        required: true,
        trigger: ['input'],
        validator: (rule: FormItemRule, value: string) => {
            if (!value) return Error('请输入联系人姓名')
            const pattern = /^([A-Za-z0-9_\u4e00-\u9fa5]{4,16})/
            if (!pattern.test(value)) {
                return Error('用户名格式错误(4~16位字母、汉字、数字、下划线)')
            }
            return true
        }
    },
    contactPhone: {
        required: true,
        trigger: ['input'],
        validator: (rule: FormItemRule, value: string) => {
            const pattern = /^1[3-9]\d{9}$/.test(value)
            if (!pattern) {
                return Error('请输入正确的手机号码')
            }
            return true
        }
    }
}

watch(modelRef.value, (newVal) => {
    props.handleModelChange(newVal)
})

function handlePreview(file: UploadFileInfo) {
    const { url } = file
    previewImageUrlRef.value = url as string
    showModalRef.value = true
}
const handleUploadChange = async (data: { fileList: UploadFileInfo[] }) => {
    modelRef.value.photos = []
    modelRef.value.fileList = data?.fileList;
    const arr: any = [];
    data.fileList.forEach(async (item) => {
        const res = await fileToBase64(item?.file)
        arr.push(res)
    })
    modelRef.value.photos = arr;
}

function fileToBase64(file: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            const base64String = reader?.result?.toString();
            resolve(base64String);
        };
        reader.onerror = function () {
            reject(new Error("Failed to load file"));
        };
    });
}

</script>

<style scoped>
.type-btn .n-radio-button {
    width: 200px;
    height: 200px;
    border: 1px solid var(--n-button-border-color);
}
</style>
