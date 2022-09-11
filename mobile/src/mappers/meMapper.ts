import { Me } from 'entities/me/me';
import { MeDTO } from 'entities/me/me.dto';

export function meMapper({ me }: MeDTO): Me {
  return {
    id: me.id,
    name: me.name,
    email: me.email,
  };
}
