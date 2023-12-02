import { z } from "zod";

export const SearchNaturezaParams = z.object({
  descricao: z.string().optional(),
  _offset: z.coerce.number().min(0, '_offset não pode ser menor que 0.').default(0),
  _size: z.coerce.number().min(1, '_size não pode ser menor que 1.').default(20),
});

export const NaturezaEntity = z.object({
  codigo: z.string(),
  descricao: z.string().nullable(),
});

export const UpdateNaturezaEntity = NaturezaEntity.omit({ codigo: true });

export const NaturezaEntityList = z.array(
  NaturezaEntity.extend({ _total: z.bigint().min(BigInt(0)), }
  )
);
