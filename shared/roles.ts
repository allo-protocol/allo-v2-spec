import { keccak256 } from '@spec.dev/core'

const ADMIN_AS_HEX = '61646d696e'

export function generatePoolRoleIds(poolId: string): string[] {
    const managerRoleId = `0x${poolId.replace('0x', '').padStart(64, '0')}`
    const adminRoleId = keccak256(managerRoleId.concat(ADMIN_AS_HEX))
    return [managerRoleId, adminRoleId]
}