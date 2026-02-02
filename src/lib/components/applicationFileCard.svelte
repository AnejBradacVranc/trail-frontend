<script lang="ts">
	import { FileText, FileImage, File as FileIcon, Download } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import type { File } from '$lib/types/jobApplication';

	interface Props {
		file: File;
	}

	let { file }: Props = $props();

	const getFileExtension = (filename: string): string => {
		return filename.split('.').pop()?.toLowerCase() || '';
	};

	const getFileIcon = (filename: string) => {
		const extension = getFileExtension(filename);

		if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(extension)) {
			return FileImage;
		}

		if (extension === 'pdf') {
			return FileText;
		}

		if (['doc', 'docx'].includes(extension)) {
			return FileText;
		}

		return FileIcon;
	};

	const getFileTypeLabel = (filename: string): string => {
		const extension = getFileExtension(filename);

		const labels: Record<string, string> = {
			pdf: 'PDF Document',
			doc: 'Word Document',
			docx: 'Word Document',
			jpg: 'Image',
			jpeg: 'Image',
			png: 'Image',
			gif: 'Image',
			webp: 'Image',
			svg: 'Image',
			bmp: 'Image'
		};

		return labels[extension] || `${extension.toUpperCase()} File`;
	};

	const getFileColor = (filename: string): string => {
		const extension = getFileExtension(filename);

		if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(extension)) {
			return 'text-blue-600';
		}

		if (extension === 'pdf') {
			return 'text-red-600';
		}

		if (['doc', 'docx'].includes(extension)) {
			return 'text-blue-700';
		}

		return 'text-gray-600';
	};

	const IconComponent = $derived(getFileIcon(file.filename));
	const fileTypeLabel = $derived(getFileTypeLabel(file.filename));
	const fileColor = $derived(getFileColor(file.filename));
</script>

<div
	class="group flex items-center justify-between gap-4 rounded-lg border bg-secondary p-4 text-secondary-foreground transition-colors"
>
	<div class="flex items-center gap-3">
		<div class="rounded-md bg-card p-2">
			<IconComponent class="h-6 w-6 {fileColor}" />
		</div>

		<div class="flex flex-col gap-0.5">
			<p class="text-sm leading-none font-medium">{file.filename}</p>
			<p class="text-xs text-muted-foreground">
				{fileTypeLabel}
			</p>
		</div>
	</div>

	<Button variant="outline" size="icon-sm">
		<Download class="h-4 w-4" />
	</Button>
</div>
