import { z } from "zod";

export const SearchQualificacaoParams = z.object({
  descricao: z.string().optional(),
  _offset: z.coerce.number().min(0, '_offset não pode ser menor que 0.').default(0),
  _size: z.coerce.number().min(1, '_size não pode ser menor que 1.').default(20),
});

export const QualificacaoEntity = z.object({
  codigo: z.string(),
  descricao: z.string().nullable(),
})

export const QualificacaoEntityList = z.array(
  QualificacaoEntity.merge(
    z.object({ _total: z.bigint().min(BigInt(0)), })
  )
);
