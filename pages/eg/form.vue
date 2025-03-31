<script setup lang="ts">
import { User } from '@element-plus/icons-vue'
import type { DynamicFormExpose } from '~/types/dynamic-form'
import DynamicForm from '~/components/common/DynamicForm.vue'

const dynamicFormRef = ref<DynamicFormExpose>()
const isSubmitting = ref(false)
const submittedData = ref(null)

// Form configuration
const formConfig = [
  {
    key: 'username',
    label: 'Username',
    name: 'input',
    slot: true, // Using custom slot for this field
    props: {
      placeholder: 'Enter your username',
    },
  },
  {
    key: 'email',
    label: 'Email',
    name: 'input',
    props: {
      placeholder: 'Enter your email',
      type: 'email',
    },
  },
  {
    key: 'password',
    label: 'Password',
    name: 'input',
    props: {
      placeholder: 'Enter your password',
      type: 'password',
      showPassword: true,
    },
  },
  {
    key: 'userType',
    label: 'User Type',
    name: 'select',
    props: {
      placeholder: 'Select user type',
    },
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'Regular User', value: 'user' },
      { label: 'Guest', value: 'guest', disabled: true },
    ],
  },
  {
    key: 'birthDate',
    label: 'Birth Date',
    name: 'date-picker',
    props: {
      type: 'date',
      placeholder: 'Select birth date',
    },
  },
  {
    key: 'interests',
    label: 'Interests',
    value: 'sports',
    name: 'checkbox-group',
    options: [
      { label: 'Sports', value: 'sports' },
      { label: 'Reading', value: 'reading' },
      { label: 'Cooking', value: 'cooking' },
      { label: 'Travel', value: 'travel' },
    ],
  },
  {
    key: 'gender',
    label: 'Gender',
    value: '',
    name: 'radio-group',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Other', value: 'other' },
    ],
  },
  {
    key: 'notifications',
    label: 'Notifications',
    name: 'switch',
    props: {
      activeText: 'Yes',
      inactiveText: 'No',
    },
  },
  {
    key: 'age',
    label: 'Age',
    name: 'input-number',
    props: {
      min: 18,
      max: 120,
      step: 1,
    },
  },
  {
    key: 'location',
    label: 'Location',
    name: 'cascader',
    props: {
      options: [
        {
          value: 'usa',
          label: 'USA',
          children: [
            { value: 'new-york', label: 'New York' },
            { value: 'california', label: 'California' },
          ],
        },
        {
          value: 'canada',
          label: 'Canada',
          children: [
            { value: 'toronto', label: 'Toronto' },
            { value: 'vancouver', label: 'Vancouver' },
          ],
        },
      ],
    },
  },
]

// Form validation rules
const formRules = {
  username: [
    { required: true, message: 'Please enter your username', trigger: 'blur' },
    { min: 3, max: 20, message: 'Length should be 3 to 20 characters', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'Please enter your email', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please enter your password', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' },
  ],
  userType: [
    { required: true, message: 'Please select user type', trigger: 'change' },
  ],
  birthDate: [
    { required: true, message: 'Please select your birth date', trigger: 'change' },
  ],
  age: [
    { required: true, message: 'Please enter your age', trigger: 'blur' },
  ],
}

// Form submission
async function submitForm() {
  if (!dynamicFormRef.value)
    return

  try {
    isSubmitting.value = true
    await dynamicFormRef.value.validate()

    // Get form data
    const formData = dynamicFormRef.value.getFormData()
    console.log('Form submitted successfully:', formData)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Show submitted data
    submittedData.value = formData

    // Success message
    ElMessage.success('Form submitted successfully!')
  }
  catch (error) {
    console.error('Form validation failed:', error)
    ElMessage.error('Please fix the errors in the form')
  }
  finally {
    isSubmitting.value = false
  }
}

// Reset form
function resetForm() {
  if (dynamicFormRef.value) {
    dynamicFormRef.value.resetFields()
    submittedData.value = null
  }
}
</script>

<template>
  <div class="form-container">
    <h2>User Registration Form</h2>

    <DynamicForm
      ref="dynamicFormRef" :form-com-list="formConfig" :rules="formRules"
      :form-props="{ labelWidth: '120px', size: 'default' }" :loading="isSubmitting"
    >
      <!-- Custom slot for a specific field -->
      <template #username="{ value, formData }">
        <div class="custom-username-field">
          <el-input v-model="formData.username" placeholder="Enter your username">
            <template #prefix>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </div>
      </template>

      <!-- Footer slot for buttons -->
      <template #formFooter>
        <div class="form-actions">
          <el-button @click="resetForm">Reset</el-button>
          <el-button type="primary" :loading="isSubmitting" @click="submitForm">Submit</el-button>
        </div>
      </template>
    </DynamicForm>

    <div v-if="submittedData" class="submitted-data">
      <h3>Submitted Data:</h3>
      <pre>{{ JSON.stringify(submittedData, null, 2) }}</pre>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.submitted-data {
  margin-top: 30px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.submitted-data pre {
  white-space: pre-wrap;
  word-break: break-all;
}

.custom-username-field {
  width: 100%;
}
</style>
