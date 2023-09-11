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
        
        <span :class="selectDone(props.record) ? 'line-through' : ''">
            {{ selectText(props.record) }}
        </span>

        <button :data-testid="`todo-delete-${selectId(props.record)}`" @click="emitDelete" :disabled="areControlsDisabled">
            🗑️
        </button>
    </div>
</template>

<style scoped>
    div {
        margin: 2.5rem 0;
        display: flex;
    }

    input {
        margin-right: 1rem;
    }

    button {
        margin-left: auto;
        opacity: 0;
        transition: all ease-in 80ms;
    }
    
    button:hover { cursor: pointer; }


    div:hover > button {
        opacity: 1;
    }

    .line-through {
        text-decoration: line-through;
    }
</style>
