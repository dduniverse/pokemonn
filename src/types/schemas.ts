import { z, ZodSchema } from "zod";

export const ResultSchema = z.object({
  name: z.string(),
  url: z.string(),
})

export const PokemonEntrySchema = z.object({
  entry_number: z.number(),
  pokemon_species: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
})

// 포켓몬 ALL 데이터 리스트
export const PokemonListSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(ResultSchema),
});

// 포켓몬 region 데이터 리스트
export const PokemonRegionListSchema = z.object({
  descriptions: z.array(z.object({
    description: z.string(),
    language: z.object({
      name: z.string(),
      url: z.string().url(),
    }),
  })),
  id: z.number(),
  is_main_series: z.boolean(),
  name: z.string(),
  names: z.array(z.object({
    language: z.object({
      name: z.string(),
      url: z.string().url(),
    }),
    name: z.string(),
  })),
  pokemon_entries: z.array(PokemonEntrySchema),
  region: z.object({
    name: z.string(),
    url: z.string().url(),
  }).optional(),
  version_groups: z.array(z.object({
    name: z.string(),
    url: z.string().url(),
  })),
});

const TypeSchema = z.object({
  slot: z.number(),
  type: z.object({
    name: z.string(),
    url: z.string(),
  }),
});

const AbilitiesSchema = z.object({
  ability: z.object({
    name: z.string(),
    url: z.string(),
  }),
  is_hidden: z.boolean(),
  slot: z.number(),
});

const StatSchema = z.object({
    base_stat: z.number(),
    effort: z.number(),
    stat: z.object({
      name: z.string(),
      url: z.string(),
    })
});

// pokemon detail 데이터 
export const PokemonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  base_experience: z.number().nullable().optional(),
  types: z.array(TypeSchema),
  stats: z.array(StatSchema),
  abilities: z.array(AbilitiesSchema),
  species: z.object({
    name: z.string(),
    url: z.string(),
  }), 
});

// pokemon species.chain 데이터
export const SpeciesDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  evolution_chain: z.object({
    url: z.string().url(),
  })
});

// pokemon evolution 데이터
export const EvolutionChainSchema: ZodSchema = z
  .lazy(() =>
    z.object({
      is_baby: z.boolean().optional().default(false),
      species: z
        .object({
          name: z.string(),
          url: z.string(),
        })
        .optional(),
      evolution_details: z.any(), // 상세한 검증 없이 유연하게 처리
      evolves_to: z
        .array(z.lazy(() => EvolutionChainSchema))
        .optional()
        .default([]), // 기본값 빈 배열 설정
    })
  )
  .optional()
  .default({}); // 최상위 객체의 기본값을 빈 객체로 설정



// 통합 Zod 스키마
export const CombinedPokemonSchema = z.union([ResultSchema, PokemonEntrySchema, PokemonDetailSchema])
export const CombinedListSchema = z.union([PokemonListSchema, PokemonRegionListSchema]);

// 스키마에서 타입 추출
export type ResultType = z.infer<typeof ResultSchema>;
export type PokemonEntryType = z.infer<typeof PokemonEntrySchema>;
export type PokemonDetailType = z.infer<typeof PokemonDetailSchema>;
export type CombinedPokemonType = z.infer<typeof CombinedPokemonSchema>;

export type PokemonListType =  z.infer<typeof PokemonListSchema>;
export type PokemonRegionListType = z.infer<typeof PokemonRegionListSchema>;
export type CombinedListType = z.infer<typeof CombinedListSchema>;
