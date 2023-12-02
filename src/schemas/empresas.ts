import { z } from "zod";

export const SearchEmpresaParams = z.object({
  cnpjBasico: z.string().optional(),
  razaoSocial: z.string().optional(),
  _offset: z.coerce.number().min(0, '_offset não pode ser menor que 0.').optional(),
  _size: z.coerce.number().min(1, '_size não pode ser menor que 1.').optional(),
});

export const EmpresaEntity = z.object({
  id: z.coerce.number(),
  cnpj_basico: z.string().nullable(),
  razao_social: z.string().nullable(),
  natureza_juridica: z.string().nullable(),
  qualificacao_responsavel: z.string().nullable(),
  capital_social: z.string().nullable(),
  porte: z.string().nullable(),
  ente_federativo_responsavel: z.string().nullable()
})

export const EmpresaEntityList = z.array(
  EmpresaEntity.merge(
    z.object({ _total: z.number().min(0), })
  )
);
