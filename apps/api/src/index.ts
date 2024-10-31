import { defineAbilityFor } from '@repo/auth'

const ability = defineAbilityFor({ id: 'abc123', role: 'ADMIN' })

const userCanInviteSomeoneElse = ability.can('manage', 'User')

console.log(userCanInviteSomeoneElse)
