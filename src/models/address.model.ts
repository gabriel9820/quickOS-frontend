interface Address {
  zipCode?: string | null;
  street?: string | null;
  number?: string | null;
  details?: string | null;
  neighborhood?: string | null;
  city?: string | null;
  state?: string | null;
}

export interface AddressInputModel extends Address {}

export interface AddressOutputModel extends Address {}
