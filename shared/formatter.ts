// deno-lint-ignore-file no-explicit-any
export function formatMetadataAsStruct(metadataValues: any[]): { [key: string]: any } {
    const [protocol, pointer] = metadataValues || []
    return { protocol: protocol?.toNumber(), pointer }
}