-- Optional seed for categories and providers; adapt to your data
insert into public.categories (label) values
  ('Moving Software & CRM'),
  ('Moving Sales Solutions'),
  ('Marketing / Advertising'),
  ('Moving Insurance'),
  ('Moving Equipment'),
  ('Apps & Online Tools'),
  ('Moving Leads');

-- Example provider (delete if using real data)
insert into public.providers (name, website, summary, is_active, is_featured)
values ('MoveMan', 'https://www.moveman.co.uk', 'UK-based moving CRM', true, true);
