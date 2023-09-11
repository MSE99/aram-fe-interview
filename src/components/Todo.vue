<script setup>
    import { selectText, selectId, selectDone } from '../stores/todo'

    const props = defineProps(['record', 'areControlsDisabled'])
    const emit = defineEmits(['change-status', 'delete'])

    const emitChangeStatus = _ => {
        emit('change-status', props.record)
    }

    const emitDelete = _ => {
        emit('delete', props.record)
    }
</script>

<template>
    <div>
        <input 
            type="checkbox" 
            :checked="selectDone(props.record)"
            :data-testid="`todo-checkbox-${selectId(props.record)}`"
            
            @change="emitChangeStatus"
            :disabled="areControlsDisabled"
        />
        
        {{ selectText(props.record) }}

        <button :data-testid="`todo-delete-${selectId(props.record)}`" @click="emitDelete" :disabled="areControlsDisabled">del</button>
    </div>
</template>
