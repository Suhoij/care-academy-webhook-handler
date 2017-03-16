create view nps_view
AS
	select count(1) as "totalCount",
    sum(cast("isPromoter" as int)) as promoters,
    sum(cast("isDetractor" as int)) as detractors,
    '' as "className",
    '' as agency
	from promoter_record
	union all
	select count(1) as "totalCount",
    sum(cast("isPromoter" as int)) as promoters,
    sum(cast("isDetractor" as int)) as detractors,
    "className",
    agency
	from promoter_record
	group by "className", agency