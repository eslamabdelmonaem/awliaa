import { Form, FormInstance, Input, Select } from 'antd';
import { useStepperContext } from '../../contexts/StepperContext';
import { useTranslation } from 'react-i18next';
import useGetCountries from '@component/hooks/useGetCountries';
import useGetCities from '@component/hooks/useGetCities';
import useAddGroomPersonalInfo from '@component/hooks/useAddGroomPersonalInfo';
import { useAuth } from '@component/contexts/AuthContext';
import { UserRole } from '@component/types/user';
import useAddParentPersonalInfo from '@component/hooks/useAddParentPersonalInfo';
import { RelationStatus } from '@component/types/user-details';

export type UserResidence = {
  girlName?: string;
  relationship?: RelationStatus;
  relationshipNote?: string;
  nationality: string;
  country: string;
  city: string;
};
export default function GeneralInformation({ form }: { form: FormInstance }) {
  const { updateStepData, currentStep, setCurrentStep } = useStepperContext();
  const { token, user } = useAuth();
  const handleSuccess = () => {
    setCurrentStep(currentStep + 1);
  };
  const { groomPersonalInfoMutation } = useAddGroomPersonalInfo(handleSuccess, token);
  const { parentPersonalInfoMutation } = useAddParentPersonalInfo(handleSuccess, token);
  const { t: translate, i18n } = useTranslation('common');
  const selectedCountryId = Form.useWatch('country', form);
  const selectedRelation = Form.useWatch('relationship', form);
  const { countries } = useGetCountries(token);
  const { cities } = useGetCities(selectedCountryId, token);
  const relationOptions = Object.values(RelationStatus);
  const onFinish = async (values: UserResidence) => {
    const selectedCountry = countries?.find((country) => country.id.toString() === values.country);
    const selectedNationality = countries?.find((country) => country.id.toString() === values.nationality);
    const selectedCity = cities?.find((city) => city.id.toString() === values.city);
    const countryName = selectedCountry ? selectedCountry.name_en : '';
    const cityName = selectedCity ? selectedCity.name_en : '';
    const personNationality = selectedNationality ? selectedNationality.name_en : '';
    const baseData = {
      nationality: personNationality,
      country: countryName,
      city: cityName,
    };
    if (user?.authorities?.some((auth) => auth.name === UserRole.GROOM)) {
      updateStepData(baseData);
      await groomPersonalInfoMutation.mutateAsync(baseData);
    } else {
      const extendedData = {
        ...baseData,
        name: values.girlName,
        relationship: values.relationship,
        relationshipNote: values.relationshipNote,
      };
      updateStepData(extendedData);
      await parentPersonalInfoMutation.mutateAsync(extendedData);
    }
  };
  return (
    <Form
      initialValues={{
        girlName: null,
        relationship: null,
        relationshipNote: null,
        nationality: user?.nationality,
        country: user?.country,
        city: user?.city,
      }}
      id="generalInformationForm"
      onFinish={onFinish}
      requiredMark={false}
      form={form}
      layout="vertical"
      className="form-container">
      {user?.authorities?.some((auth) => auth.name === UserRole.PARENT) && (
        <div className="form-item-wrapper w-[100%]">
          <Form.Item
            id="girlName"
            className=" xs:[w-100%] md:w-[50%]"
            label={<span className="font-bold">{translate('girl name')}</span>}
            name="girlName"
            rules={[{ required: true, message: translate('please enter girl name') }]}>
            <Input className="user-info-input max-w-[600px]" placeholder={translate('enter girl name')} />
          </Form.Item>
          <Form.Item
            id="relationship"
            label={<span className="font-bold">{translate('relationship')}</span>}
            name="relationship"
            rules={[{ required: true, message: translate('please select relationship') }]}
            className={`user-info-select ${selectedRelation === RelationStatus.OTHER ? 'xs:w-[50%] md:w-[25%] xs:max-w-[100%] md:max-w-[294px]' : 'xs:[100%] md:w-[50%]'}`}>
            <Select
              showSearch
              optionFilterProp="label"
              className="details-select"
              placeholder={translate('choose relationship')}>
              {relationOptions.map((relation) => (
                <Select.Option
                  className={`${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}
                  label={i18n.language === 'ar' ? translate(relation.toLowerCase()) : relation}
                  key={relation}
                  value={relation}>
                  {translate(relation.toLowerCase())}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {selectedRelation === RelationStatus.OTHER && (
            <Form.Item
              id="relationshipNote"
              label={<span className="font-bold">{translate('enter relationship')}</span>}
              className="xs:w-[50%] md:w-[25%]"
              name="relationshipNote"
              rules={[{ required: true, message: translate('please specify other relation') }]}>
              <Input
                className="user-info-input xs:!max-w-[600px] md:max-w-[294px]"
                placeholder={translate('enter relationship')}
              />
            </Form.Item>
          )}
        </div>
      )}
      <div className="form-item-wrapper w-[100%]">
        <Form.Item
          id="nationality"
          label={<span className="font-bold">{translate('nationality')}</span>}
          name="nationality"
          rules={[{ required: true, message: translate('please select your nationality') }]}
          className="user-info-select xs:w-[100%] md:w-[50%]">
          <Select
            className="details-select"
            showSearch
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toString()
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toString().toLowerCase())
            }
            placeholder={translate('nationality')}>
            {countries &&
              countries.map((country) => (
                <Select.Option
                  key={country.code}
                  value={country.id}
                  label={i18n.language === 'ar' ? country.name_ar : country.name_en}>
                  {i18n.language === 'ar' ? country.name_ar : country.name_en}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          id="country"
          label={<span className="font-bold">{translate('residence country')}</span>}
          name="country"
          className="user-info-select xs:w-[100%] md:w-[50%]"
          rules={[{ required: true, message: translate('please select country') }]}>
          <Select
            className="details-select"
            direction={i18n.language === 'ar' ? 'rtl' : 'ltr'}
            showSearch
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toString()
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toString().toLowerCase())
            }
            placeholder={translate('residence country')}>
            {countries &&
              countries.map((country) => (
                <Select.Option
                  key={country.code}
                  value={country.id}
                  label={i18n.language === 'ar' ? country.name_ar : country.name_en}>
                  {i18n.language === 'ar' ? country.name_ar : country.name_en}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </div>
      <Form.Item
        id="city"
        rules={[{ required: true, message: translate('please select city') }]}
        label={<span className="font-bold">{translate('residence city')}</span>}
        name="city"
        className="user-info-select xs:w-[100%] md:w-[50%]">
        <Select
          className="details-select"
          direction={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          showSearch
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '')
              .toString()
              .toLowerCase()
              .localeCompare((optionB?.label ?? '').toString().toLowerCase())
          }
          placeholder={translate('residence city')}>
          {cities &&
            cities.map((city) => (
              <Select.Option
                key={city.code}
                value={city.id}
                label={i18n.language === 'ar' ? city.name_ar : city.name_en}>
                {i18n.language === 'ar' ? city.name_ar : city.name_en}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
    </Form>
  );
}
