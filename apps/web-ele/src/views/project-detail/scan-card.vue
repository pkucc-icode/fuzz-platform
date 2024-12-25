<script setup lang="ts">
import type { ProjectApi } from '#/api';
import { Card, CardTitle, CardContent, CardFooter } from '@vben/common-ui';

interface BugCardProps {
    data: ProjectApi.Scan;
}

const props = defineProps<BugCardProps>();

</script>

<template>
    <Card>
        <CardTitle class="p-3">{{ props.data.type }}</CardTitle>
        <CardContent>
            <pre class="p-3">
                {{ props.data.code }}
            </pre>
        </CardContent>
        <CardFooter class="text-indigo-300">
            {{ props.data.codeLine }}
        </CardFooter>
    </Card>
</template>