import { z } from "zod";

export const SearchSociosParams = z.object({
  cnpjBasico: z.string().optional(),
  nome: z.string().optional(),
  nome_representante_legal: z.string().optional(),
  _offset: z.coerce.number().min(0, '_offset não pode ser menor que 0.').default(0),
  _size: z.coerce.number().min(1, '_size não pode ser menor que 1.').default(20),
});

export const SociosEntity = z.object({
  _total: z.bigint().min(BigInt(0)),
  id: z.coerce.number(),
  cnpj_basico: z.string().nullable(),
  identificador_socio: z.string().nullable(),
  nome: z.string().nullable(),
  cpf_cnpj: z.string().nullable(),
  qualificacao: z.string().nullable(),
  data_entrada: z.string().nullable(),
  pais: z.string().nullable(),
  cpf_representante_legal: z.string().nullable(),
  nome_representante_legal: z.string().nullable(),
  qualificacao_representante_legal: z.string().nullable(),
  faixa_etaria: z.string().nullable(),
})

export const SociosEntityList = z.array(SociosEntity);
