interface Tenant {
  name: string;
}

export interface TenantInputModel extends Tenant {}

export interface TenantOutputModel extends Tenant {
  externalId: string;
}
