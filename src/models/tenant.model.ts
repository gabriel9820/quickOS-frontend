interface Tenant {
  name: string;
}

export interface TenantOutputModel extends Tenant {
  externalId: string;
}
